const petition = async (url, queryParams) => {
  const params = new URLSearchParams(queryParams);
  const newUrl = `${url}/?${params.toString()}`;

  console.log(newUrl);

  const response = await fetch(newUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

document.addEventListener("DOMContentLoaded", async () => {
  const userNameHeader = document.getElementById("userNameHeader");
  const commonFilesList = document.getElementById("commonFilesList");
  const privateFilesList = document.getElementById("privateFilesList");

  const currentUrl = window.location.href.split("?")[0];

  const userData = await petition(currentUrl, { request: "data" });
  const personalFiles = (await petition(currentUrl, { request: "files" }))
    .files;
  const commonPath = `https://localhost:8080/${
    userData.admin === 1 ? "adminCommon" : "userCommon"
  }`;
  const commonFiles = (await petition(commonPath, { request: "files" })).files;

  userNameHeader.innerHTML = userData.userName;

  if (personalFiles.length === 0) {
    privateFilesList.innerHTML = "No files found";
  } else {
    personalFiles.forEach(fileName => {
      const itemContainer = document.createElement("li");
      const itemLink = document.createElement("a");

      itemLink.href = `${currentUrl}/${fileName}`;
      itemLink.innerHTML = fileName;

      itemContainer.appendChild(itemLink);
      privateFilesList.appendChild(itemContainer);
    });
  }

  if (commonFiles.length === 0) {
    commonFilesList.innerHTML = "No files found";
  } else {
    commonFiles.forEach(fileName => {
      const itemContainer = document.createElement("li");
      const itemLink = document.createElement("a");

      itemLink.href = `${commonPath}/${fileName}`;
      itemLink.innerHTML = fileName;

      itemContainer.appendChild(itemLink);
      commonFilesList.appendChild(itemContainer);
    });
  }
});
