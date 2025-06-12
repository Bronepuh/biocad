import { useState, useRef, useEffect } from "react";
import { notification } from "../components";
import { AMINO_ACID_COLORS } from "@shared/utils/constants";

interface SequenceVisualizationProps {
	seq1: string;
	seq2: string;
}

const SequenceVisualization: React.FC<SequenceVisualizationProps> = ({ seq1, seq2 }) => {
	const [copied, setCopied] = useState(false);
	const [lineLength, setLineLength] = useState(60); // Начальная длина строки
	const containerRef = useRef<HTMLDivElement>(null);

	// Рассчитываем оптимальную длину строки на основе ширины контейнера
	useEffect(() => {
		const updateLineLength = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				// Рассчитываем количество символов, которые помещаются в строку
				// Предполагаем, что каждый символ занимает примерно 10px
				const charsPerLine = Math.max(10, Math.floor(containerWidth / 10));
				setLineLength(charsPerLine);
			}
		};

		updateLineLength();
		window.addEventListener("resize", updateLineLength);

		return () => window.removeEventListener("resize", updateLineLength);
	}, []);

	// Разбиваем последовательность на строки фиксированной длины
	const splitSequence = (sequence: string): string[] => {
		const lines: string[] = [];
		for (let i = 0; i < sequence.length; i += lineLength) {
			lines.push(sequence.substring(i, i + lineLength));
		}
		return lines;
	};

	const seq1Lines = splitSequence(seq1);
	const seq2Lines = splitSequence(seq2);

	// Обработка копирования в буфер обмена
	useEffect(() => {
		const handleCopy = (e: ClipboardEvent) => {
			const selection = window.getSelection();
			if (selection && selection.toString().trim() !== "") {
				e.preventDefault();
				navigator.clipboard.writeText(selection.toString());
				setCopied(true);
				setTimeout(() => setCopied(false), 1000);
			}
		};

		const container = containerRef.current;
		if (container) container.addEventListener("copy", handleCopy);

		return () => {
			if (container) container.removeEventListener("copy", handleCopy);
		};
	}, []);

	// Показ уведомления о копировании
	useEffect(() => {
		if (copied) {
			notification.success({
				message: "Скопировано!",
				description: "Последовательность скопирована в буфер обмена",
				duration: 1,
			});
		}
	}, [copied]);

	// Рендер последовательности с цветовой разметкой
	const renderSequence = (sequence: string, compareTo?: string) => {
		return sequence.split("").map((char, index) => {
			const backgroundColor = AMINO_ACID_COLORS[char] ?? "#FFFFFF";
			let textColor = "#000";

			if (compareTo && char !== compareTo[index]) {
				textColor = "#FF0000"; // Красный для различий
			}

			return (
				<span
					key={index}
					style={{
						display: "inline-block",
						minWidth: "20px",
						textAlign: "center",
						padding: "2px",
						margin: "1px",
						backgroundColor,
						color: textColor,
						fontFamily: "monospace",
						borderRadius: "3px",
						userSelect: "text",
					}}
				>
					{char}
				</span>
			);
		});
	};

	return (
		<div ref={containerRef} style={{ marginTop: "20px" }}>
			{seq1Lines.map((line, index) => (
				<div
					key={`seq1-${index}`}
					style={{
						fontFamily: "monospace",
						whiteSpace: "pre-wrap",
						padding: "5px",
						backgroundColor: "#f9f9f9",
						borderRadius: "4px",
						marginBottom: "2px",
					}}
				>
					{renderSequence(line)}
				</div>
			))}

			{seq2Lines.map((line, index) => (
				<div
					key={`seq2-${index}`}
					style={{
						fontFamily: "monospace",
						whiteSpace: "pre-wrap",
						padding: "5px",
						backgroundColor: "#f9f9f9",
						borderRadius: "4px",
						marginBottom: "2px",
					}}
				>
					{renderSequence(line, seq1Lines[index] || "")}
				</div>
			))}
		</div>
	);
};

export default SequenceVisualization;
