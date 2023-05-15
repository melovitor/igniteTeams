import { useRoute, useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { TextInput } from "react-native";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";


type RouteParams = {
    group: string
}

export function Players(){

    const [isLoading, setIsLoading] = useState(true)
    
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('time a')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const route = useRoute()
    const {group} = route.params as RouteParams
    const newPlayerNameInputRef = useRef<TextInput>(null)
    const navigation = useNavigation()
 
    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Novo player', 'Informe o nome do player para adicionar!')
        }

        const newPlayer = {
            name: newPlayerName,
            team: team
        }

        try {
            await PlayerAddByGroup(newPlayer, group)
            newPlayerNameInputRef.current?.blur()
            setNewPlayerName('')
            fetchPlayerByTeam()
        } catch (e) {
            if(e instanceof AppError){
                Alert.alert('Novo player', e.message)
            } else {
                console.log(e)
                Alert.alert('Novo player', 'Não foi possivel adicionar o novo player!')
            }
        }
    }

    async function fetchPlayerByTeam() {
        try {
            setIsLoading(true)                        
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
            setIsLoading(false)

        } catch (e) {
            console.log(e)
            Alert.alert('Players', "Não foi possivel carregar os players!")
        }
        
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            
            await playerRemoveByGroup(playerName, group)
            fetchPlayerByTeam()

        } catch (e) {
            console.log(e)
            Alert.alert('Remover player', 'Não foi possivel remover esse player!')
        }
        
    }

    async function groupRemove() {
        try {

            await groupRemoveByName(group)
            navigation.navigate("groups")
            
        } catch (e) {
            console.log(e)
            Alert.alert('Remover grupo', 'Não foi possivel remover esse grupo!')
        }
        
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover esta turma?',
            [
                {text: 'Não', style: 'destructive'},
                {text: 'Sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        fetchPlayerByTeam()
    }, [team])
    
    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times!"            
            />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    onPress={handleAddPlayer}
                    icon='add'
                />
            </Form>
            <HeaderList>
                
                    <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter 
                            title={item}
                            isActive={item === team} 
                            onPress={() => setTeam(item)}                        
                        />
                    )}
                    horizontal  
                    showsHorizontalScrollIndicator={false}       
                />
            
            <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
                
            </HeaderList>
            {isLoading ? <Loading/> : 
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => 
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => {handleRemovePlayer(item.name)}}

                    />
                }
                ListEmptyComponent= {() => <ListEmpty title='' subtitle='Não há pessoas nesse time.'/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />
            }
            <Button 
                title="Remover turma" 
                type="RED"
                onPress={handleGroupRemove}

            />

            
        </Container>

    )
}