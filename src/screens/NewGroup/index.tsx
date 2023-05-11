import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import {Container, Content, Icon} from './styles'
import { Input } from '@components/Input'

export function NewGroup(){
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    function handleNew(){
        navigation.navigate('players', {group})
    }

    return (
        <Container>
            <Header showBackButton={true}/>
            <Content>
                <Icon/>
                <Highlight title='Nova turma' subtitle='Crie uma nova turma para adicionar pessoas!'/>
                <Input 
                    placeholder='Nome da turma' 
                    onChangeText={setGroup}
                />
                <Button 
                    title='Criar nova turma' 
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}