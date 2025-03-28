import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Http} from '../api/http.ts';
import {TodoList} from '../types.ts';

// interface ListItem {
//   item_id: number;
//   content: string;
// }
//
// interface TodoList {
//   Items: ListItem[]
// }

export const useListStore = defineStore('listStore', () => {
  const client = new Http({
    'baseURL': `http://${document.location.hostname}:8247`,
  });

  const list = ref<TodoList>({
    'Items': [],
  });
  const newListItem = ref<string>('');

  const bufferID = ref<number | null>();
  const bufferContent = ref<string>();
  const editBuffer = (id: number | null, content: string) => {
    bufferID.value = id;
    bufferContent.value = content;
  };

  const updateList = async () => {
    list.value.Items = await client.getList();
    console.dir(list.value.Items);
  };
  const addListItem = async (content: string) => {
    await client.addListItem(content);
    await updateList();
    // console.log('HERE');
  };
  const updateListItem = async (id: number, content: string | undefined) => {
    if (content) await client.updateListItem(id, content);
    await updateList();
    editBuffer(null, '');
  };
  const deleteListItem = async (id: number) => {
    await client.deleteListItem(id);
    await updateList();
  };
  const deleteList = async () => {
    await client.deleteList();
    await updateList();
  };

  return {
    list,
    newListItem,
    updateList,
    bufferID,
    bufferContent,
    editBuffer,
    addListItem,
    updateListItem,
    deleteListItem,
    deleteList
  };
});
