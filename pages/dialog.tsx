import { useFieldExtension, useUiExtensionDialog } from "@hygraph/app-sdk-react";
import { Box, Button, DialogContent, DialogFooter, DialogHeader, Flex, Grid, Heading, Text, Image } from "@hygraph/baukasten";
import { useState, useEffect } from "react";
import { fetchBikesMockapi } from "../lib/queries/pim-mockapi";
import { fetchBikesHygraph } from "../lib/queries/pim-hygraph";

const Dialog = () => {

    const [bikes, setBikes] = useState([]);
    const { onCloseDialog, model }: { onCloseDialog: any, model: any } = useUiExtensionDialog();
    const { context } = useFieldExtension();
    

    const onClose = (bike?: any) => {

        onCloseDialog(bike || null);
    }

    useEffect(() => {
        const loadBikes = async () => {
            let bikes = [];
            if (model.apiIdPlural === 'BikesDataHygraph') {
                bikes = await fetchBikesHygraph(context);
            } else {
                bikes = await fetchBikesMockapi(context);
            }
            
            setBikes(bikes);
        };
        loadBikes();
    }, [context]);

    return (
        <Box>
            <DialogHeader>
                <Flex justifyContent="space-between">
                    <Heading as="h4">Choose a bike from External Source</Heading>
                    <Button onClick={() => onClose()}>Close</Button>
                </Flex>
            </DialogHeader>
            <DialogContent  height="600px" overflow="auto">
                <Grid gridTemplateColumns="repeat(3, 1fr)" gap="15">
                {bikes.map((bike: any) => (
                    <Flex key={bike.id} height="300px" justifyContent="center" alignItems="center" flexDirection="column">
                        <Text>{bike.name}</Text>
                        <Image src={bike.image} alt={bike.name}  height="200px" cursor="pointer" onClick={() => onClose(bike)}/>
                    </Flex>
                ))}
                </Grid>
            </DialogContent>
            <DialogFooter>
                <Button onClick={onClose}>Close</Button>
            </DialogFooter>
        </Box>
    );
};

const Wrapped = () => (  
    <Dialog />
);

export default Wrapped;