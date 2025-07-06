import { Text, TouchableOpacity } from 'react-native'

const Button = ({ label, onPress, bg = 'bg-brand-primary', textColor = 'text-white', disabled = false }) => {
	return (
		<TouchableOpacity
			className={`py-4 rounded-lg items-center ${bg} w-96`}
			onPress={onPress}
			disabled={disabled}
		>
			<Text className={`font-semibold ${textColor} text-m`}>{label}</Text>
		</TouchableOpacity>
	)
}

export default Button
