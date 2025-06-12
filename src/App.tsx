import { useState } from "react";
import { Layout, Typography, Card, Space, Tooltip } from "@shared/lib/kit/components";
import SequenceInputForm from "./shared/lib/kit/sequence-input-form/SequenceInputForm";
import SequenceVisualization from "./shared/lib/kit/sequence-visualization/SequenceVisualization";
import DnaAnimation from "@shared/lib/kit/dna/Dna";
import { Flex } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
	const [sequences, setSequences] = useState<{ seq1: string; seq2: string } | null>(null);

	const handleSubmit = (seq1: string, seq2: string) => {
		setSequences({ seq1, seq2 });
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header style={{ backgroundColor: "#fff", padding: "0 24px" }}>
				<div style={{ maxWidth: "100%", overflow: "hidden" }}>
					<Tooltip title="Визуализация выравнивания аминокислотных последовательностей">
						<div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							<Title
								level={3}
								style={{
									margin: 0,
									lineHeight: "64px",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								Визуализация выравнивания аминокислотных последовательностей
							</Title>
						</div>
					</Tooltip>
				</div>
			</Header>
			<div style={{ overflow: "hidden", padding: "16px" }}>
				<Flex justify="center">
					<div style={{ maxWidth: "100%", width: "100%", overflow: "hidden" }}>
						<DnaAnimation />
					</div>
				</Flex>
			</div>

			<Content style={{ padding: "24px", display: "flex", justifyContent: "center", overflowX: "hidden" }}>
				<Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 1000 }}>
					<Card>
						<SequenceInputForm onSubmit={handleSubmit} />
					</Card>

					{sequences && (
						<Card title="Результат выравнивания">
							<SequenceVisualization seq1={sequences.seq1} seq2={sequences.seq2} />
						</Card>
					)}
				</Space>
			</Content>
		</Layout>
	);
};

export default App;
