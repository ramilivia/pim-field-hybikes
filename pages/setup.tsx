import { useFieldExtension, Wrapper, useApp } from "@hygraph/app-sdk-react";
import { Button } from "@hygraph/baukasten";
// Add this at the top of your custom-field.tsx file



export default function TenantFieldPage() {
;
    const { updateInstallation, installation } = useApp();
    
    const onInstallApp = () => {
        updateInstallation({
            status: 'COMPLETED',
            config: {}
        });
    }

    return (
        <div>
            { installation.status !== 'COMPLETED' ? 
                <Button onClick={onInstallApp}>Install App</Button>
            : 
                <p>App installed</p>
            }
        </div>
    );
}
