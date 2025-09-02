import joblib
import numpy as np

MODEL_PATH = "rf_ia_model.pkl"

# --- Carregar payload ---
payload = joblib.load(MODEL_PATH)
rf_model = payload["model"]  # o RandomForestRegressor
FEATURES = payload["features"]
SHAPE = payload["shape"]

# --- Exemplo de dados de entrada ---
team_matrix = [
    [415, 6, 8.2, 0.5, 513, 0.217, 1.25],
    [379, 8, 7.3, 0.667, 337, 0.142, 1.29],
    [418, 6, 8.9, 0.5, 552, 0.233, 1.22],
    [491, 9, 9.3, 0.75, 815, 0.344, 1.41],
    [266, 10, 0.7, 0.833, 149, 0.063, 3.27],
]

# --- Normalizar e reshapar para o modelo (5x7 -> 35,) ---
X_input = np.array(team_matrix, dtype=float).reshape(1, -1)  # 1 amostra

# --- Fazer previsão ---
pred = rf_model.predict(X_input)

# --- Retornar em porcentagem ---
pred_percent = float(pred[0])
print(f"Predição de sinergia: {pred_percent:.2f}%")
