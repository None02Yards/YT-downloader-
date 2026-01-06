// export class DownloadJob {
//   constructor({ url, output }) {
//     this.url = url;
//     this.output = output;
//   }
// }
export class DownloadJob {
  constructor({ id, url, output, format }) {
    this.id = id;        // ✅ THIS WAS MISSING
    this.url = url;
    this.output = output;
    this.format = format;
  }
}
