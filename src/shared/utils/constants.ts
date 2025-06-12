// Цветовая схема для аминокислот
export const AMINO_ACID_COLORS: Record<string, string> = {
	A: "#FFCC00", // Alanine
	R: "#0000FF", // Arginine
	N: "#FF00FF", // Asparagine
	D: "#FF0000", // Aspartic acid
	C: "#FFFF00", // Cysteine
	Q: "#FF66CC", // Glutamine
	E: "#FF0066", // Glutamic acid
	G: "#00FFCC", // Glycine
	H: "#0066FF", // Histidine
	I: "#66FF00", // Isoleucine
	L: "#33FF00", // Leucine
	K: "#6600FF", // Lysine
	M: "#00FF00", // Methionine
	F: "#009900", // Phenylalanine
	P: "#FF9900", // Proline
	S: "#FF3366", // Serine
	T: "#00FF66", // Threonine
	W: "#9900FF", // Tryptophan
	Y: "#33CCFF", // Tyrosine
	V: "#99FF00", // Valine
	"-": "#FFFFFF", // Gap
};

// Разрешенные символы аминокислот
export const VALID_AMINO_ACIDS = /^[ARNDCQEGHILKMFPSTWYV-]*$/i;

// Проверка последовательности на валидность
export const validateSequence = (seq: string): boolean => {
	return VALID_AMINO_ACIDS.test(seq);
};
