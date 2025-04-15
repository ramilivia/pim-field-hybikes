import { useFieldExtension, useUiExtensionDialog, Wrapper, useApp } from "@hygraph/app-sdk-react";
import { useState, useEffect } from "react";
import { getItems } from "../lib/utils";
import {
    Box,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogFooter,
    Button,
    OverlayProvider,
    Text,
    Input,
    Flex,
    Image
} from '@hygraph/baukasten';
import { fetchBikeMockapi } from "../lib/queries/pim-mockapi";
import { fetchBikeHygraph } from "../lib/queries/pim-hygraph";
export default function PimFieldPage() {

    const { value, onChange, context, field, form, openDialog, installation, model } = useFieldExtension();
    const [bike, setBike] = useState({ id: '', name: '', image: '' } as any);

    console.log('CONTEXT: ', context);
    console.log('FIELD: ', field);
    console.log('FORM: ', form);
    console.log('INSTALLATION: ', installation);
    console.log('MODEL: ', model);
    const onClick = async () => {
        const dialogOutput = await openDialog(
            "/dialog",
            {
                installation,
                model,
                field,
                maxWidth: "1280px",
            },
        );
        if (dialogOutput) {
            setBike(dialogOutput);
            onChange(dialogOutput.id);
        }
    }

    useEffect(() => {
        const fetchBike = async () => {
            
            if (value) {
                let response = {};
                if (model.apiIdPlural === 'BikesDataHygraph') {
                    response = await fetchBikeHygraph(context, value);
                } else {
                    response = await fetchBikeMockapi(context, value);
                }
                 
                setBike(response);
            }
        };

        fetchBike();
    }, []);

    return (

        <Box>
            <Flex justifyContent="space-around" alignItems="center">
                <Image width="20%" src={bike.image} alt={bike.name} maxWidth="100px" />
                <Box width="60%">
                    <Input width="100%" disabled value={bike.id} placeholder="Bike ID" marginTop="10px" />
                    <Input width="100%" disabled value={bike.name} placeholder="Bike Name" marginTop="10px" />
                </Box>
                <Button onClick={onClick}>Select Bike</Button>
            </Flex>
        </Box>

    );
}
