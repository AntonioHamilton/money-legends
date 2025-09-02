import joblib
import numpy as np
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import os

MODEL_PATH = "rf_ia_model.pkl"
ONNX_PATH = "rf_ia_model.onnx"

print("Diretório atual:", os.getcwd())
print("Esperando encontrar o modelo em:", os.path.abspath(MODEL_PATH))

if not os.path.exists(MODEL_PATH):
    print(f"Erro: O arquivo de modelo '{MODEL_PATH}' não foi encontrado.")
    print(
        "Verifique se o arquivo existe e se você está executando este script no mesmo diretório em que o salvou."
    )
    exit()

try:
    payload = joblib.load(MODEL_PATH)
    rf_model = payload["model"]
    FEATURES = payload["features"]
    SHAPE = payload["shape"]
    print(f"Modelo '{MODEL_PATH}' carregado com sucesso.")

except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    exit()

# --- 2) Tipo de entrada para ONNX (1 amostra, n_features) ---
n_features = SHAPE[0] * SHAPE[1]  # 5 jogadores x 7 métricas = 35
initial_type = [("float_input", FloatTensorType([None, n_features]))]

# --- 3) Converter ---
try:
    onnx_model = convert_sklearn(rf_model, initial_types=initial_type)
    print("Modelo convertido para ONNX com sucesso.")
except Exception as e:
    print(f"Erro ao converter o modelo para ONNX: {e}")
    exit()

# --- 4) Salvar arquivo ONNX ---
try:
    with open(ONNX_PATH, "wb") as f:
        f.write(onnx_model.SerializeToString())

    print(f"Modelo ONNX salvo com sucesso em: {os.path.abspath(ONNX_PATH)}")

except IOError as e:
    print(f"Erro de permissão ou caminho ao tentar salvar o arquivo: {e}")
    print(
        f"Tente executar o script com permissões de administrador ou em um diretório com permissões de escrita."
    )
    exit()
