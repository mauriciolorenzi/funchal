FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src

COPY ["MenuManagerWebAPI/MenuManagerWebAPI.csproj", "MenuManagerWebAPI/"]
RUN dotnet restore "MenuManagerWebAPI/MenuManagerWebAPI.csproj"
COPY . .
WORKDIR "/src/MenuManagerWebAPI"
RUN dotnet build "MenuManagerWebAPI.csproj" -c Release -o /app/build --no-restore

FROM build-env AS publish
RUN dotnet publish "MenuManagerWebAPI.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet MenuManagerWebAPI.dll