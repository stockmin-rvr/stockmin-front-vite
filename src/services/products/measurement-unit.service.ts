import { api } from "../../config/api";
import type { MeasurementUnit } from "../../types/models";

type CreateResponse = {
    message: string;
    data: MeasurementUnit;
}

type FindAllResponse = {
    message: string;
    data: MeasurementUnit[];
}

type DeleteResponse = {
    message: string;
    data: MeasurementUnit;
}

export const measurementUnitService = {
    create: async (data: { code: string }): Promise<CreateResponse> => {
        const response = await api.post('/measurement-unit', data);
        return response.data
    },
    findAll: async (): Promise<FindAllResponse> => {
        const response = await api.get('/measurement-unit');
        return response.data
    },
    delete: async (unitId: string): Promise<DeleteResponse> => {
        const response = await api.delete('/measurement-unit', {
            params: { unitId }
        });
        return response.data
    }
}


