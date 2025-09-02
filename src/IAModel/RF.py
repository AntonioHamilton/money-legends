import json
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor

MODEL_PATH = "rf_ia_model.pkl"

FEATURES = [
    "Gold Per Minute",
    "KDA",
    "Farm Per Minute",
    "Kill Participation",
    "Damage Per Minute",
    "Team Damage Percentage",
    "Vision Score Per Minute",
]

# Shape esperado: 5 jogadores x 7 métricas
SHAPE = (5, 7)


def _norm(value, low, high):
    return np.clip((value - low) / (high - low + 1e-9), 0.0, 1.0)


# Faixas para normalização (baseadas em métricas comuns do LoL)
RANGES = {
    "Gold Per Minute": (200.0, 600.0),
    "KDA": (0.0, 10.0),
    "Farm Per Minute": (0.0, 10.0),
    "Kill Participation": (0.0, 1.0),  # agora em porcentagem
    "Damage Per Minute": (100.0, 1500.0),
    "Team Damage Percentage": (0.0, 1.0),  # em porcentagem
    "Vision Score Per Minute": (0.0, 3.0),
}


def _synthesize_synergy(team_matrix):
    """Cria um rótulo de sinergia fictício (0-100) para treino."""
    team = np.asarray(team_matrix, dtype=float)
    if team.shape != SHAPE:
        raise ValueError(f"team_matrix deve ter shape {SHAPE}, mas veio {team.shape}")

    # Normalizar valores
    norms = np.zeros_like(team, dtype=float)
    for j, feat in enumerate(FEATURES):
        low, high = RANGES[feat]
        norms[:, j] = _norm(team[:, j], low, high)

    # Pesos de contribuição
    w = {
        "Gold Per Minute": 0.15,
        "KDA": 0.20,
        "Farm Per Minute": 0.15,
        "Kill Participation": 0.25,
        "Damage Per Minute": 0.15,
        "Team Damage Percentage": 0.05,
        "Vision Score Per Minute": 0.05,
    }

    col_idx = {feat: i for i, feat in enumerate(FEATURES)}

    mean_part = sum(w[feat] * norms[:, col_idx[feat]].mean() for feat in FEATURES)

    # Penaliza variância (se só um carrega o time)
    var_penalty = 0.05 * (
        norms[:, col_idx["Kill Participation"]].std()
        + norms[:, col_idx["Team Damage Percentage"]].std()
    )

    score = 100.0 * np.clip(mean_part - var_penalty, 0.0, 1.0)
    return float(np.clip(score, 0.0, 100.0))


if __name__ == "__main__":
    # --- 1) Ler JSON com times ---
    with open("data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    X = []
    y = []

    for key, team_matrix in data.items():
        team = np.asarray(team_matrix, dtype=float)
        if team.shape != SHAPE:
            raise ValueError(f"O time {key} não tem shape {SHAPE}, veio {team.shape}")

        X.append(team.reshape(-1))
        y.append(_synthesize_synergy(team))

    X = np.array(X)
    y = np.array(y)

    # --- 2) Treinar modelo ---
    model = RandomForestRegressor(
        n_estimators=300,
        random_state=1337,
        n_jobs=-1,
    )
    model.fit(X, y)

    # --- 3) Salvar modelo ---
    payload = {"model": model, "features": FEATURES, "shape": SHAPE}
    joblib.dump(payload, MODEL_PATH)
    print(f"Modelo treinado e salvo em {MODEL_PATH}")
