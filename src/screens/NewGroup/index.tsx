import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import {Container, Content, Icon} from './styles'
import { Input } from '@components/Input'
import { groupCrate } from '@storage/group/groupCrate'
import { AppError } from '@utils/AppError'

export function NewGroup(){
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    async function handleNew(){
        try {
            if(group.trim().length === 0 ){
                return Alert.alert('Novo grupo', 'Informe o nome do grupo.')
            }          
            await groupCrate(group)
            navigation.navigate('players', {group})
        } catch (e) {
            if(e instanceof AppError){
                Alert.alert('Novo grupo', e.message)
            } else {
                Alert.alert('Novo grupo', 'Não foi possivel crtiar um novo grupo.')
                console.log(e)
            }
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
                    onSubmitEditing={handleNew}
                    returnKeyType="done"
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