export interface Order {
    id?: string;
    userId: string;
    userName: string;
    productId: string;
    productName: string;
    tanggalPesanan: Date;
    tanggalEventMulai: Date;
    tanggalEventAkhir: Date;
    status: string;
    buktiPesanan: string;
    komentar: string;
    phoneNumber: string;
}
