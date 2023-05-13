import { Container, Icon, ButtonIconTypeStyleProps} from "./styles";
import { TouchableOpacityProps } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
    type?: ButtonIconTypeStyleProps
} 

export function ButtonIcon({ icon, type = 'GREEN', ...rest}: Props){
    return(
        <Container {...rest}>
            <Icon
                name={icon} type={type}
            />
        </Container>
    )

}