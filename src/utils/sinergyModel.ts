import { InferenceSession, Tensor } from "onnxruntime-web";

// 1. Caminho para o modelo ONNX
// O modelo deve ser acessível publicamente pelo cliente.
const ONNX_MODEL_PATH = "/rf_ia_model.onnx";

// 2. Formato esperado (1, 35)
const INPUT_SHAPE = [1, 35];

// 5. Rodar inferência
/**
 * Executa a inferência de um modelo de IA ONNX no navegador.
 * @param teamMatrix Uma matriz 5x7 de estatísticas de jogadores.
 * @returns A pontuação de sinergia ou 0 em caso de erro.
 */
export const runIAModel = async (teamMatrix: number[][]) => {
	if (teamMatrix.length !== 5 || teamMatrix[0].length !== 7) {
		throw new Error(
			`A matriz de entrada deve ser (5, 7), mas veio (${teamMatrix.length}, ${teamMatrix[0].length})`
		);
	}

	// Aplane a matriz em um array unidimensional e converta para Float32Array.
	const flatInput = Float32Array.from(teamMatrix.flat());

	try {
		// A inferência agora é criada diretamente a partir do caminho público.
		const session = await InferenceSession.create(ONNX_MODEL_PATH);

		// O nome da entrada é acessado através da propriedade 'inputNames' do array.
		const inputName = session.inputNames[0];

		const feeds: any = {};
		feeds[inputName] = new Tensor("float32", flatInput, INPUT_SHAPE);

		const results = await session.run(feeds);
		const outputName = session.outputNames[0];

		const synergyScore = results[outputName].data[0] as number;

		return synergyScore;
	} catch (err) {
		console.error("Erro ao rodar o modelo ONNX:", err);
		return 0;
	}
};
