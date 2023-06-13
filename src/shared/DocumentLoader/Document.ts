import { Document as DocumentBase } from 'langchain/document';

export type RawMeta = {
  blobType: 'application/pdf';
  'loc.lines.from': 56;
  'loc.lines.to': 120;
  'loc.pageNumber': 4;
  'pdf.info.Author': 'Cathrin Bruun-Hansen';
  'pdf.info.CreationDate': "D:20200306164822+01'00'";
  'pdf.info.Creator': 'Microsoft® Word for Office 365';
  'pdf.info.IsAcroFormPresent': false;
  'pdf.info.IsXFAPresent': false;
  'pdf.info.ModDate': "D:20200306164822+01'00'";
  'pdf.info.PDFFormatVersion': '1.7';
  'pdf.info.Producer': 'Microsoft® Word for Office 365';
  'pdf.metadata._metadata.dc:creator': 'Cathrin Bruun-Hansen';
  'pdf.metadata._metadata.pdf:producer': 'Microsoft® Word for Office 365';
  'pdf.metadata._metadata.xmp:createdate': '2020-03-06T16:48:22+01:00';
  'pdf.metadata._metadata.xmp:creatortool': 'Microsoft® Word for Office 365';
  'pdf.metadata._metadata.xmp:modifydate': '2020-03-06T16:48:22+01:00';
  'pdf.metadata._metadata.xmpmm:documentid': 'uuid:5C0A8F62-2508-42A0-A2BA-A009896B4DFC';
  'pdf.metadata._metadata.xmpmm:instanceid': 'uuid:5C0A8F62-2508-42A0-A2BA-A009896B4DFC';
  'pdf.totalPages': 6;
  'pdf.version': '1.10.100';
  source: 'blob';
  testData: 'Some random shit';
};

export type RawDocument = DocumentBase<Record<string, any>>;

export type Document<T extends DocumentMeta> = DocumentBase<T>;

export type DocumentMeta = {
  originalName: string;
};
