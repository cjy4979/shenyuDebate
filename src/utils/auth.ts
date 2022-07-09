export const setCookie = (name: string, value: string | number) => {
    document.cookie = name + '=' + value + '';
  };
  
  export const getCookie = (name: string) => {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split('=');
      if (arr2[0] === name) {
        return arr2[1];
      }
    }
    return '';
  };
  
  export const removeCookie = (name: any) => {
    setCookie(name, '');
  };
  
  
  