import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { getAllGroups } from '@storage/group/getAllGoups';
import { Loading } from '@components/Loading';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)
  
  function handleNewGroup(){  
    navigation.navigate('new')
  }

  async function fetchGroups(){
    
    try {
      const data = await getAllGroups()
      setGroups(data)

    } catch (e) {
      console.log(e)
    } 
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, [groups]))

  return (
    <Container>
      <Header />
      <Highlight title='Teams' subtitle='Jogue com a sua turma!'/>
      {isLoading ? <Loading/> : 
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={() => handleOpenGroup(item)}
            />
          )}
          ListEmptyComponent= {() => <ListEmpty title='Sem Turmas cadastratas!' subtitle='Que tal cadastrar a primeira turma?'/>}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
        />
      }
      <Button 
        title='Criar nova turma' 
        onPress={handleNewGroup}
        
      />
    </Container>    
  );
}''