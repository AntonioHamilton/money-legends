import * as ort from "onnxruntime-node";

// 1. Caminho para o modelo ONNX
import path from "path";

const ONNX_PATH = path.join(process.cwd(), "public", "rf_ia_model.onnx");

// 2. Formato esperado (1, 35)
const INPUT_SHAPE = [1, 35];

// --- Exemplo de dados de entrada ---
// 5 jogadores × 7 métricas = 35 features

// 5. Rodar inferência
export const runIAModel = async (teamMatrix: number[][]) => {
	if (teamMatrix.length !== 5 || teamMatrix[0].length !== 7) {
		throw new Error(
			`A matriz de entrada deve ser (5, 7), mas veio (${teamMatrix.length}, ${teamMatrix[0].length})`
		);
	}

	const flatInput = Float32Array.from(teamMatrix.flat());

	try {
		const session = await ort.InferenceSession.create(ONNX_PATH);

		const inputName = session.inputNames[0];

		const feeds: any = {};
		feeds[inputName] = new ort.Tensor("float32", flatInput, INPUT_SHAPE);

		const results = await session.run(feeds);
		const outputName = session.outputNames[0];

		const synergyScore = results[outputName].data[0] as number;

		return synergyScore;
	} catch (err) {
		return 0;
	}
};
