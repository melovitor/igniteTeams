import {TouchableOpacity} from 'react-native'
import styled from "styled-components/native";


export type ButtonTypeStyleProps = 'GREEN' | 'RED';

type Props = {
    type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    background-color: ${({theme, type}) => type === 'GREEN' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`