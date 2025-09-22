import { useFieldExtension } from "@hygraph/app-sdk-react";
import { useState, useEffect } from "react";
import { Box, Button, Input, Flex } from '@hygraph/baukasten';
import { getItem } from "../lib/utils";
import Image from "next/image";
import BikeLogoIcon from "../components/BikeLogoIcon";

// Spinner component matching the dialog's animation
const Spinner = ({ size = 24 }: { size?: number }) => (
    <Box style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid #e2e8f0',
        borderTop: '2px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }} />
);

export default function PimFieldPage() {

    const { value, onChange, context, field, form, openDialog, installation, model } = useFieldExtension();
    const [bike, setBike] = useState({ id: '', model_name: '', image_url: '', battery_range_km: '', price: '' } as any);
    const [isLoading, setIsLoading] = useState(false);

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
                setIsLoading(true);
                try {
                    const response = await getItem(value);
                    setBike(response);
                } catch (error) {
                    console.error('Error fetching bike:', error);
                    // Reset bike state on error
                    setBike({ id: '', model_name: '', image_url: '', battery_range_km: '', price: '' });
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBike();
    }, [value]);

    return (
        <Box 
            onClick={onClick}
            style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minHeight: '88px',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out'
            }}
            onMouseEnter={(e: any) => {
                e.currentTarget.style.backgroundColor = '#f1f3f4';
                e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e: any) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.borderColor = '#dee2e6';
            }}
        >
            {/* Bike Image Container */}
            <Box style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid #dee2e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                {bike.image_url ? (
                    <Image 
                        width={80} 
                        height={80} 
                        src={bike.image_url} 
                        alt={bike.model_name || 'Bike'}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                ) : isLoading && value ? (
                    <Spinner size={32} />
                ) : (
                    <BikeLogoIcon 
                        size={56} 
                        style={{ 
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            padding: '4px',
                            opacity: 0.7
                        }} 
                    />
                )}
            </Box>

            {/* Bike Information */}
            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Box style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#495057',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {bike.model_name || 'No bike selected'}
                </Box>
                {bike.battery_range_km && (
                    <Box style={{
                        fontSize: '12px',
                        color: '#6c757d',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        Range: {bike.battery_range_km} • {bike.price || 'Price not available'}
                    </Box>
                )}
                <Box style={{
                    fontSize: '10px',
                    color: '#adb5bd',
                    fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {bike.id || ''}
                </Box>
            </Box>

            {/* Close/Select Button */}
            <Box 
                style={{
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    color: '#6c757d',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                    pointerEvents: 'none'
                }}
            >
                {bike.id ? '×' : '+'}
            </Box>
        </Box>
    );
}