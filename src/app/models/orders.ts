export interface Order {
    id?: string;
    userId: string;
    productId: string;
    tanggalPesanan: Date;
    tanggalEventMulai: Date;
    tanggalEventAkhir: Date;
    status: string;
    buktiPesanan: string;
}
