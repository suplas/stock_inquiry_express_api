"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KrxStockModel = void 0;
class KrxStockModel {
    constructor(BAS_DD, ISU_CD, ISU_NM, MKT_NM, SECT_TP_NM, TDD_CLSPRC, CMPPREVDD_PRC, FLUC_RT, TDD_OPNPRC, TDD_HGPRC, TDD_LWPRC, ACC_TRDVOL, ACC_TRDVAL, MKTCAP, LIST_SHRS) {
        this.BAS_DD = BAS_DD;
        this.ISU_CD = ISU_CD;
        this.ISU_NM = ISU_NM;
        this.MKT_NM = MKT_NM;
        this.SECT_TP_NM = SECT_TP_NM;
        this.TDD_CLSPRC = TDD_CLSPRC;
        this.CMPPREVDD_PRC = CMPPREVDD_PRC;
        this.FLUC_RT = FLUC_RT;
        this.TDD_OPNPRC = TDD_OPNPRC;
        this.TDD_HGPRC = TDD_HGPRC;
        this.TDD_LWPRC = TDD_LWPRC;
        this.ACC_TRDVOL = ACC_TRDVOL;
        this.ACC_TRDVAL = ACC_TRDVAL;
        this.MKTCAP = MKTCAP;
        this.LIST_SHRS = LIST_SHRS;
    }
}
exports.KrxStockModel = KrxStockModel;
