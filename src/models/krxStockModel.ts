import { StringLiteral } from "typescript";

export class KrxStockModel {
  private BAS_DD: string;
  private ISU_CD: string;
  private ISU_NM: string;
  private MKT_NM: string;
  private SECT_TP_NM: string;
  private TDD_CLSPRC: string;
  private CMPPREVDD_PRC: string;
  private FLUC_RT: string;
  private TDD_OPNPRC: string;
  private TDD_HGPRC: string;
  private TDD_LWPRC: string;
  private ACC_TRDVOL: string;
  private ACC_TRDVAL: string;
  private MKTCAP: string;
  private LIST_SHRS: string;

  constructor(
    BAS_DD: string,
    ISU_CD: string,
    ISU_NM: string,
    MKT_NM: string,
    SECT_TP_NM: string,
    TDD_CLSPRC: string,
    CMPPREVDD_PRC: string,
    FLUC_RT: string,
    TDD_OPNPRC: string,
    TDD_HGPRC: string,
    TDD_LWPRC: string,
    ACC_TRDVOL: string,
    ACC_TRDVAL: string,
    MKTCAP: string,
    LIST_SHRS: string
  ) {
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
