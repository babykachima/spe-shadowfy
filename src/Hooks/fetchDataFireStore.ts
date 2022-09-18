import { useState, useCallback, useEffect } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const useGetDataFireStore = (collectionName: string) => {
  const [data, setData] = useState<[]>();
  const fetchData = useCallback(async () => {
    const results = firestore()
      .collection(collectionName)
      .onSnapshot((querySnapshot) => {
        const listsData: any = [];
        querySnapshot.forEach((documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
          listsData.push({ ...documentSnapshot.data(), key: documentSnapshot.id }), setData(listsData);
        });
      });
    return results;
  }, [collectionName]);

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, [fetchData]);

  return [data];
};

export const useGetDetailDataFireStore = (collectionName: string, docummentId: string) => {
  const [dataDetail, setDataDetail] = useState();
  const fetchDataDetail = useCallback(async () => {
    const results = await firestore()
      .collection(collectionName)
      .doc(docummentId)
      .onSnapshot((docummentData: FirebaseFirestoreTypes.DocumentData) => setDataDetail(docummentData.data()));
    return results;
  }, [collectionName, docummentId]);

  useEffect(() => {
    fetchDataDetail();
    return () => {
      fetchDataDetail();
    };
  }, [fetchDataDetail]);
  return [dataDetail];
};
