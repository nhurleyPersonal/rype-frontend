import { useTheme } from "@/hooks/useTheme";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Theme } from "@/styles/themes";

interface HeaderButtonProps {
    text: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const HeaderButton = ({ text }: HeaderButtonProps) => {
    const { theme } = useTheme();
    const styles = makeStyles(theme);
    
    return (
        <View style={[styles.button]}>
            <Text style={[styles.text]}>{text}</Text>
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    button: {
        backgroundColor: theme.colors.layerTwo,
        opacity: .75,
        borderRadius: 40,
        padding: 8,
        marginHorizontal: 4,
    },
    text: {
        fontSize: theme.typography.fontSizes.xs,
        color: 'black'
    }
});

export default HeaderButton;
