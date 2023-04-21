import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import {Container, Content, Icon} from './styles'
import { Input } from '@components/Input'

export function NewGroup(){
    return (
        <Container>
            <Header showBackButton={true}/>
            <Content>
                <Icon/>
                <Highlight title='Nova turma' subtitle='Crie uma nova turma para adicionar pessoas!'/>
                <Input placeholder='Nome da turma' />
                <Button title='Criar nova turma' style={{marginTop: 20}}/>
            </Content>
        </Container>
    )
}