import { Text, TextInput, View } from 'react-native'


const Input = ({ label, placeholder = '', value, onChangeText, secure = false }) => {
	return (
		<View className="mb-4">
			{label && <Text className="mb-1 text-m text-gray-700 text-white">{label}</Text>}
			<TextInput
				className="rounded-md w-96 py-4 text-m px-4 bg-white"
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secure}
			/>
		</View>
	)
}

export default Input
