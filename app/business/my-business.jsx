import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCart from '../../components/Business/BusinessListCart';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyBusiness() {
    const [mybusiness, setMybusiness] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
            headerStyle: {
                backgroundColor: Colors.PRIMARY
            }
        });
        if (user) {
            getUserBusiness();
        }
    }, [user]);

    const getUserBusiness = async () => {
        setLoading(true);
        setMybusiness([]);
        const q = query(collection(db, 'BusinessList'), where("userEmail", '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshots = await getDocs(q);
        const businesses = querySnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMybusiness(businesses);
        setLoading(false);
    };

    return (
        <View style={{ padding: 20, marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>My business</Text>
            <FlatList 
                onRefresh={getUserBusiness} 
                refreshing={loading} 
                data={mybusiness} 
                renderItem={({ item, index }) => (
                    <BusinessListCart key={index} business={item} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
