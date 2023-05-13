import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import {PlayersGetByGroup} from "./PlayersGetByGroup"

export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
    try {
        const storagePlayers = await PlayersGetByGroup(group)

        const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayer.name)
        if(playerAlreadyExists.length > 0 ){
            throw new AppError('Este player já está adicionado em um time aqui!')
        }
        const storage = JSON.stringify([...storagePlayers, newPlayer])
        
        await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, storage)

    } catch (e) {
        throw (e)
    }
}
