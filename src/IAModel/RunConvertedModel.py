import onnxruntime as ort
import numpy as np

# 1. Defina o caminho para o arquivo ONNX
ONNX_PATH = "rf_ia_model.onnx"

# 2. Defina o formato da entrada do seu modelo.
# O modelo ONNX espera uma array plana de (1, 35).
# 5 jogadores * 7 métricas = 35 features
INPUT_SHAPE = (1, 35)

# --- Exemplo de dados de entrada ---
# Simula uma matriz de 5 jogadores e 7 métricas cada.
# Use seus próprios dados reais aqui para um teste mais preciso.
# Os dados devem ser do tipo 'float32', o padrão para modelos ONNX.
team_matrix = np.array(
    [
        # Jogador 1 (Gold, KDA, Farm, KP, Dmg, Dmg%, Visão)
        [350.0, 3.5, 7.0, 0.45, 800.0, 0.25, 1.5],
        # Jogador 2
        [400.0, 4.0, 8.5, 0.55, 950.0, 0.30, 1.8],
        # Jogador 3
        [320.0, 2.8, 6.5, 0.35, 700.0, 0.20, 1.2],
        # Jogador 4
        [380.0, 5.0, 7.8, 0.60, 1000.0, 0.35, 2.0],
        # Jogador 5
        [300.0, 2.0, 5.5, 0.30, 650.0, 0.15, 1.0],
    ],
    dtype=np.float32,
)

# 3. Verifique se a matriz de entrada está no formato 5x7
if team_matrix.shape != (5, 7):
    raise ValueError(
        f"A matriz de entrada deve ser (5, 7), mas veio {team_matrix.shape}"
    )

# 4. Aplane a matriz para o formato esperado pelo modelo (1, 35)
input_data = team_matrix.reshape(INPUT_SHAPE)

# 5. Crie a sessão de inferência com o modelo ONNX
try:
    session = ort.InferenceSession(ONNX_PATH)
    # Obtenha o nome da entrada do modelo
    input_name = session.get_inputs()[0].name
    print(f"Modelo ONNX '{ONNX_PATH}' carregado com sucesso.")

    # 6. Execute a previsão
    output = session.run(None, {input_name: input_data})

    # O resultado é uma lista, o primeiro elemento é o que queremos
    # Use .item() para extrair o valor numérico do array do NumPy
    synergy_score = output[0][0].item()

    # 7. Imprima o resultado
    print("--- Resultado da Previsão ---")
    print(f"O modelo previu a seguinte pontuação de sinergia: {synergy_score:.2f}")

except Exception as e:
    print(f"Erro ao executar a previsão: {e}")
    print(
        "Verifique se o arquivo .onnx existe e se a biblioteca onnxruntime está instalada."
    )
