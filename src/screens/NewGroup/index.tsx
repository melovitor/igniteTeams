import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import {Container, Content, Icon} from './styles'
import { Input } from '@components/Input'
import { groupCrate } from '@storage/group/groupCrate'

export function NewGroup(){
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    async function handleNew(){
        try {
            await groupCrate(group)
            navigation.navigate('players', {group})
        } catch (e) {
          console.log(e)
        }

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