import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
    try {
        
        await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, '')

    } catch (e) {
        throw (e)
    }
}
