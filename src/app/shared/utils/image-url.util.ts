import { environment } from '../../../environments/environment';

export function prefixDocApiUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('assets/')) {
    return url;
  }
  const base = environment.docApiUrl.endsWith('/') ? environment.docApiUrl : environment.docApiUrl + '/';
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  return base + cleanUrl;
}
