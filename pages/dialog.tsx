import { useFieldExtension, useUiExtensionDialog } from "@hygraph/app-sdk-react";
import { Box, Button, DialogContent, DialogHeader, Flex, Grid, Heading, Text, Image } from "@hygraph/baukasten";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getItems } from "../lib/utils";
import NextImage from "next/image";

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
                        <svg fill="#6c757d" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.25 300.25" style={{ 
                            opacity: 0.8,
                            marginRight: '12px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            padding: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        }}>
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M238.703,127.946c-5.119,0-10.089,0.487-14.847,1.67l-18.955-50.955h6.176c9.72,0,18.913-3.577,25.887-10.345l6.541-6.273 c2.973-2.885,3.043-7.595,0.158-10.568s-7.633-3.024-10.605-0.139l-6.541,6.206c-4.159,4.037-9.643,6.118-15.439,6.118h-16.979 c-2.458,0-4.76,1.356-6.161,3.375c-1.401,2.02-1.725,4.673-0.865,6.975l7.214,19.372c-0.046-0.001-0.093,0.141-0.139,0.141 c-0.016,0-0.032,0.137-0.049,0.137H98.126L85.165,71.823l14.078-4.895c3.467-1.191,5.564-4.55,4.961-8.166 c-0.604-3.615-3.731-6.101-7.397-6.101H55.597c-5.775,0-10.475,4.506-10.475,10.281c0,8.941,7.266,16.12,16.196,16.12 c1.79,0,3.565-0.347,5.277-0.934l4.103-1.433l13.146,21.996l-10.097,30.285c-3.312-0.669-6.714-1.09-10.193-1.201 c-17.589-0.563-34.055,6.138-46.219,18.697c-11.694,12.074-17.84,27.992-17.303,44.822c1.032,32.337,27.172,58.476,59.509,59.508 c0.673,0.021,1.34,0.032,2.008,0.032c16.811,0,32.513-6.716,44.212-18.794c9.464-9.773,15.291-22.38,16.885-35.38h12.051 c2.598,2,5.961,3.634,9.639,3.634c8.196,0,14.864-6.636,14.864-14.833c0-2.661-0.712-5.139-1.942-7.303l42.042-71.305l10.553,28.289 c-19.435,10.359-32.698,30.831-32.698,54.348c0,33.938,27.61,61.549,61.548,61.549s61.547-27.61,61.547-61.547 S272.641,127.946,238.703,127.946z M180.979,108.661l-36.606,62.091c-0.013,0-0.025-0.062-0.037-0.062 c-0.043,0-0.084,0.096-0.127,0.097l-37.131-62.125H180.979z M93.992,115.669l37.378,62.514c-0.618,1.101-1.089,2.478-1.412,3.478 h-7.326c-2.591-21-16.064-39.121-34.658-48.001L93.992,115.669z M74.447,181.661c-0.503-1-1.081-1.526-1.728-2.233l8.865-26.626 c10.72,5.925,18.562,16.859,20.834,28.859H74.447z M91.395,218.126c-8.215,8.481-19.311,13.04-31.215,12.655 c-21.822-0.696-39.461-18.319-40.157-40.141c-0.363-11.369,3.784-22.112,11.679-30.262c7.898-8.154,18.497-12.642,29.845-12.642 c0.455,0,0.91,0.01,1.369,0.024c1.502,0.048,2.981,0.185,4.439,0.389l-8.966,26.9c-6.569,1.537-11.481,7.43-11.481,14.461 c0,8.196,6.668,14.801,14.863,14.801c5.552,0,10.395-2.65,12.947-7.65h27.699C100.966,204.661,97.197,212.135,91.395,218.126z M238.703,231.042c-22.909,0-41.548-18.639-41.548-41.548c0-14.932,7.921-28.044,19.779-35.369l14.098,37.785 c1.125,3.017,3.986,4.88,7.027,4.88c0.871,0,1.757-0.152,2.621-0.476c3.881-1.447,5.853-5.768,4.404-9.648l-14.169-37.977 c2.524-0.481,5.125-0.743,7.788-0.743c22.909,0,41.547,18.639,41.547,41.548S261.613,231.042,238.703,231.042z"></path>
                            </g>
                        </svg>
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