import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralDetailForm from "./general-details";
import { ClientDetails as ClientDetailsType } from "@/utils/types";
import BankDetails from "./bank-details";
import AddressDetails from "./address-details";

interface PropTypes {
    data: ClientDetailsType;
}

const ClientDetails: React.FC<PropTypes> = ({ data }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="general" className="w-full">
                    <TabsList>
                        <TabsTrigger value="general">
                            General Details
                        </TabsTrigger>
                        <TabsTrigger value="address">
                            Address Details
                        </TabsTrigger>
                        <TabsTrigger value="bank">Bank Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <GeneralDetailForm data={data.responseData} />
                    </TabsContent>
                    <TabsContent value="address">
                        <AddressDetails data={data.address} />
                    </TabsContent>
                    <TabsContent value="bank">
                        <BankDetails data={data.bankDetail} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ClientDetails;
