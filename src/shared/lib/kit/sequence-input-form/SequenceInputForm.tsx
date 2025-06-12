import { validateSequence } from "@shared/utils/constants";
import { Form, message, Input, Space, Button } from "../components";

interface SequenceInputFormProps {
	onSubmit: (seq1: string, seq2: string) => void;
}

const SequenceInputForm: React.FC<SequenceInputFormProps> = ({ onSubmit }) => {
	const [form] = Form.useForm();

	const handleSubmit = (values: { seq1: string; seq2: string }) => {
		const { seq1, seq2 } = values;
		if (seq1.length !== seq2.length) {
			message.error("Длина последовательностей должна быть одинаковой!");
			return;
		}
		onSubmit(seq1.toUpperCase(), seq2.toUpperCase());
	};

	const handleReset = () => {
		form.resetFields();
	};

	return (
		<Form form={form} onFinish={handleSubmit} layout="vertical">
			<Form.Item
				name="seq1"
				label="Первая аминокислотная последовательность"
				normalize={(value: string) => value?.toUpperCase() || ""}
				rules={[
					{ required: true, message: "Введите последовательность!" },
					{
						validator: (_, value) =>
							validateSequence(value)
								? Promise.resolve()
								: Promise.reject(
										new Error("Недопустимые символы! Разрешены только A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V,-"),
								  ),
					},
				]}
			>
				<Input placeholder="VLSPADKTNIKASWEKIGSHG..." />
			</Form.Item>

			<Form.Item
				name="seq2"
				label="Вторая аминокислотная последовательность"
				normalize={(value: string) => value?.toUpperCase() || ""}
				rules={[
					{ required: true, message: "Введите последовательность!" },
					{
						validator: (_, value) =>
							validateSequence(value)
								? Promise.resolve()
								: Promise.reject(
										new Error("Недопустимые символы! Разрешены только A,R,N,D,C,E,Q,G,H,I,L,K,M,F,P,S,T,W,Y,V,-"),
								  ),
					},
				]}
			>
				<Input placeholder="VLSAADKTNIKASWEKIGSHG..." />
			</Form.Item>

			<Form.Item>
				<Space style={{ width: "100%" }} direction="horizontal">
					<Button
						type="primary"
						htmlType="submit"
						block
						style={{
							overflow: "hidden",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
						}}
					>
						Выравнивание
					</Button>
					<Button onClick={handleReset}>Очистить</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default SequenceInputForm;
