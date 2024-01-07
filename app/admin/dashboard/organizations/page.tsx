import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { CreateOrganizationDialog } from "./components/CreateOrganizationDialog/CreateOrganizationDialog";



export default function () {
    return (
        <Flex direction={'column'} className="w-full h-full">
            <CreateOrganizationDialog/>
        </Flex>
    )
}