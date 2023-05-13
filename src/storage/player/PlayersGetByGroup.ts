import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLECTION } from "@storage/storageConfig";

export async function PlayersGetByGroup(group:string) {
    try {   
        
        const storage = await AsyncStorage.getItem((`${PLAYER_COLECTION}-${group}`))
        const players:PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

        return players

    } catch (e) {
        throw e
    }
}