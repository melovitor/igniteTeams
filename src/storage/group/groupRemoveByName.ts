import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION, PLAYER_COLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAllGoups";

export async function groupRemoveByName(groupName:string) {
    try {
        const storedGroups = await getAllGroups()
        const groups = storedGroups.filter(group => group !== groupName)

        await AsyncStorage.setItem(GROUP_COLECTION, JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLECTION}-${groupName}`)
    } catch (e) {
        throw e
    }
}