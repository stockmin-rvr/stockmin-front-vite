import { api } from "../../config/api";
import type { MeasurementUnit } from "../../types/models";

export type CreateMeasurementUnitResponse = {
    message: string;
    data: MeasurementUnit;
}

export type GetAllMeasurementUnitsRespnse = {
    message: string;
    data: MeasurementUnit[];
}

export type DeleteMeasurementUnitResponse = {
    message: string;
    data: MeasurementUnit;
}

export const createMeasurementUnit = async(data:{code: string}):Promise<CreateMeasurementUnitResponse> => {
    const response = await api.post('/measurement-unit', data );
    return response.data
}


export const getAllMeasurementUnits = async():Promise<MeasurementUnit[]> => {
    const response = await api.get('/measurement-unit' );
    return response.data.data
}

export const deleteMeasurementUnit = async(unitId: string):Promise<DeleteMeasurementUnitResponse> => {
    const response = await api.delete('/measurement-unit', {
        params:{unitId}
    });
    return response.data
}