import { useFieldExtension, useUiExtensionDialog } from "@hygraph/app-sdk-react";
import { Box, Button, DialogContent, DialogHeader, Flex, Grid, Heading, Text, Image } from "@hygraph/baukasten";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getItems } from "../lib/utils";
import NextImage from "next/image";
import BikeLogoIcon from "../components/BikeLogoIcon";

// Component to handle image loading with skeleton
const AssetImage = ({ src, alt, onLoad }: { src: string; alt: string; onLoad?: () => void }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        onLoad?.();
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    return (
        <Box style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            minHeight: '246px', // Account for container padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Skeleton placeholder */}
            {!imageLoaded && (
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        borderRadius: '6px',
                        zIndex: 1
                    }}
                />
            )}
            
            {/* Actual image */}
            {!imageError ? (
                <Image
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2
                    }}
                />
            ) : (
                // Error placeholder
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '12px',
                        fontWeight: '500',
                        zIndex: 2
                    }}
                >
                    Failed to load
                </Box>
            )}
        </Box>
    );
};

const Dialog = () => {

    const [selectedGroup, setSelectedGroup] = useState('group1');
    const { onCloseDialog, model }: { onCloseDialog: any, model: any } = useUiExtensionDialog();
    const { context } = useFieldExtension();
    const [bikes, setBikes] = useState([]);



    const onClose = (bike?: any) => {

        onCloseDialog(bike || null);
    }

    useEffect(() => {
        const loadBikes = async () => {
            let bikes = [];
            bikes = await getItems()
            console.log(bikes);
            setBikes(bikes);
        };
        loadBikes();
    }, [context, selectedGroup]);
    
    return (
        <Box>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <DialogHeader style={{ 
                background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', 
                borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
                position: 'relative',
                padding: '12px 24px 22px 24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(8px)'
            }}>
                <Button 
                    onClick={() => onClose()}
                    style={{ 
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'transparent', 
                        color: '#475569',
                        border: 'none',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '500',
                        fontSize: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        lineHeight: '1',
                        zIndex: 10
                    }}
                    onMouseEnter={(e: any) => {
                        e.currentTarget.style.color = '#1e293b';
                    }}
                    onMouseLeave={(e: any) => {
                        e.currentTarget.style.color = '#475569';
                    }}
                >
                    ×
                </Button>
                <Flex justifyContent="space-between" alignItems="flex-start">
                    <Flex alignItems="center" gap="4" style={{ marginTop: '16px' }}>
                        <BikeLogoIcon 
                            size={56} 
                            style={{ 
                                marginRight: '12px'
                            }} 
                        />
                        <Box>
                            <Heading as="h4" style={{ 
                                color: '#1e293b', 
                                margin: 0,
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                fontSize: '20px',
                                fontWeight: '600',
                                letterSpacing: '-0.3px'
                            }}>
                                Choose a Bicycle from External Source
                            </Heading>
                            <Text style={{
                                color: '#64748b',
                                fontSize: '13px',
                                fontWeight: '400',
                                margin: 0,
                                marginTop: '1px',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                            }}>
                                Select from your bicycle library
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </DialogHeader>
            <DialogContent height="550px" overflow="auto" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16">
                    
                    {bikes.map((bike: any) => (
                       
                        <Flex
                            key={bike.id}
                            height="320px"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            style={{
                                transition: 'border 0.2s ease, transform 0.2s ease',
                                cursor: 'pointer',
                                border: '2px solid transparent',
                                borderRadius: '12px',
                                padding: '8px',
                                minHeight: '320px',
                                maxHeight: '320px',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.currentTarget.style.border = '2px solid rgb(3, 152, 253)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.currentTarget.style.border = '2px solid transparent';
                                e.currentTarget.style.transform = 'translateY(0px)';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                            }}
                            onClick={() => onClose(bike)}
                        >
                            {/* Full Image Container with Overlay Text */}
                            {console.log(bike)}
                            <Box style={{ 
                                height: '304px',
                                width: '100%',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <AssetImage
                                    src={bike.image_url}
                                    alt={bike.model_name}
                                />
                                
                                {/* Text Overlay */}
                                <Box style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 100%)',
                                    padding: '6px 12px 6px 12px',
                                    color: 'white',
                                    zIndex: 10
                                }}>
                                    {/* Model Name */}
                                    <Text style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#ffffff',
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '0.9',
                                        marginBottom: '0px',
                                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
                                        display: 'block'
                                    }}>
                                        {bike.model_name}
                                    </Text>
                                    
                                    <Flex justifyContent="space-between" alignItems="center" style={{ lineHeight: '0.9' }}>
                                        {/* Battery Range */}
                                        <Text style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#ffffff',
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
                                            lineHeight: '0.9'
                                        }}>
                                            Range: {bike.battery_range_km}
                                        </Text>
                                        
                                        {/* Price */}
                                        <Text style={{
                                            fontSize: '18px',
                                            fontWeight: '800',
                                            color: '#ffffff',
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
                                            lineHeight: '0.9'
                                        }}>
                                            {bike.price}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </Flex>
                    ))}
                </Grid>
            </DialogContent>
        </Box>
    );
};

const Wrapped = () => (
    <Dialog />
);

export default Wrapped;