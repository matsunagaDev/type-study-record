import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from './components/ui/provider';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { Button } from './components/ui/button';
import {
  Center,
  Heading,
  HStack,
  Input,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  Stack,
  Table,
} from '@chakra-ui/react';
import { Field } from './components/ui/field';
import { GetAllRecords, InsertRecord } from './lib/record';
import { Record } from './domain/record';

export const App = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [inputStudyRecord, setInputStudyRecord] = useState<string>('');
  const [inputStudyTime, setInputStudyTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  // 学習内容のテキストボックス
  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputStudyRecord(e.target.value);
    },
    [inputStudyRecord]
  );

  // 学習時間のテキストボックス
  const handleTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputStudyTime(parseInt(e.target.value));
    },
    [inputStudyTime]
  );

  console.log(`関数の外：${isOpen}`);

  // テスト
  const onClickTest = async () => {
    alert('テスト');
    const RecordsData = await GetAllRecords();
    console.log(RecordsData);
  };

  // 登録
  const onClickRecordAdd = async () => {
    try {
      const newRecord = {
        title: inputStudyRecord,
        time: inputStudyTime,
      };
      // insert用関数
      const AddRecord = await InsertRecord(newRecord.title, newRecord.time);
      console.log(AddRecord);
      setRecords([...records, AddRecord[0]]);
      setInputStudyRecord('');
      setInputStudyTime(0);
      // ダイアログを閉じる
      setIsOpen(false);
    } catch (error) {
      console.error('データの登録に失敗', error);
      setError('データの登録に失敗しました');
    }
  };

  // 一覧表示
  useEffect(() => {
    const getAllRecords = async () => {
      const RecordsData = await GetAllRecords();
      // console.log(RecordsData);

      setRecords(RecordsData);
      setIsLoading(false);
    };
    getAllRecords();
  }, []);

  /**
   * 画面表示
   */
  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <Provider>
      <DialogRoot
        open={isOpen}
        onOpenChange={(e: boolean) => {
          setIsOpen(e.isOpen);
        }}
        initialFocusEl={() => ref.current}
      >
        <DialogTrigger>
          <Button variant="outline">登録</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Header</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Field label="学習記録">
                <Input
                  ref={ref}
                  onChange={(e) => handleTextChange(e)}
                  value={inputStudyRecord}
                  placeholder="React"
                />
              </Field>
              <Field label="学習時間">
                <Input
                  type="number"
                  onChange={(e) => handleTimeChange(e)}
                  value={inputStudyTime}
                  placeholder="0"
                />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
                colorPalette={'red'}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button onClick={onClickRecordAdd} colorPalette={'green'}>
                登録
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>

      <Stack width="full" gap="10">
        <Heading size="xl">学習記録アプリ</Heading>
        <Center>
          <Table.ScrollArea borderWidth="5px" rounded="md" height="400px">
            <Table.Root
              colorPalette={'orange'}
              variant={'line'}
              size={'md'}
              showColumnBorder
              stickyHeader
              striped
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="400px">学習内容</Table.ColumnHeader>
                  <Table.ColumnHeader minW="400px" textAlign="end">
                    学習時間
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minW="200px" textAlign="end">
                    投稿日
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {records.map((record) => (
                  <Table.Row key={record.id}>
                    <Table.Cell>{record.learn_title}</Table.Cell>
                    <Table.Cell>{record.learn_time}</Table.Cell>
                    <Table.Cell>{record.created_at}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
          <PaginationRoot count={records.length * 5} pageSize={5} page={1}>
            <HStack wrap="wrap">
              <PaginationPrevTrigger />
              <PaginationItem />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
      </Stack>
    </Provider>
  );
};
