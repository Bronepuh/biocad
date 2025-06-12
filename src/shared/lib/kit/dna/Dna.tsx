import styles from "./dna.module.css";

const DnaAnimation: React.FC = () => {
	const elements = Array.from({ length: 20 });

	return (
		<div className={styles.wrapper}>
			<div className={styles.dna}>
				{elements.map((_, i) => (
					<div key={i} className={styles.ele} style={{ animationDelay: `-${(i + 1) * 0.15}s` }} />
				))}
			</div>
		</div>
	);
};

export default DnaAnimation;
