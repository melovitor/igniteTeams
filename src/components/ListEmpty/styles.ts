import styled, {css} from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    ${({theme}) => css`
        text-align: center;
        font-size: ${theme.FONT_SIZE.LG}px;
        font-family:  ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLORS.GRAY_200};
    `}
`
export const SubTitle = styled.Text`
${({theme}) => css`
    text-align: center;
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family:  ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
    `}
    
`