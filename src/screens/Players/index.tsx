import { useRoute } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList, Alert } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayersGetByGroup } from "@storage/player/PlayersGetByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";


type RouteParams = {
    group: string
}

export function Players(){
    
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('time a')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const route = useRoute()
    const {group} = route.params as RouteParams

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
            
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)

        } catch (e) {
            console.log(e)
            Alert.alert('Players', "Não foi possivel carregar os players!")
        }
        
    }
    
    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times!"            
            />
            <Form>
                <Input
                onChangeText={setNewPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
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
            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({item}) => 
                    <PlayerCard 
                        name={item}
                        onRemove={() => {}}
                    />
                }
                ListEmptyComponent= {() => <ListEmpty title='' subtitle='Não há pessoas nesse time.'/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />
            <Button title="Remover turma" type="RED"/>

            
        </Container>

    )
}