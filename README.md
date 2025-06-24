# Eileen & Dennis Hochzeitswebsite

Eine Hochzeitswebseite mit RSVP-Funktionalität für Eileen und Dennis.

## Deployment mit Docker & Traefik

Diese Anwendung ist für den Einsatz mit Docker und Traefik als Reverse-Proxy optimiert.

### Voraussetzungen

- Docker und Docker Compose installiert
- Traefik als Reverse Proxy konfiguriert
- Domain mit DNS Einstellungen auf den Server zeigend

### Konfiguration

1. Bearbeite `docker-compose.yml` und ändere `hochzeit.deine-domain.de` zu deiner tatsächlichen Domain.

2. Stelle sicher, dass das Traefik-Netzwerk existiert:
   ```
   docker network create trafik
   ```

### Deployment

#### Linux/macOS:

```bash
# Ausführbar machen
chmod +x deploy.sh

# Ausführen
./deploy.sh
```

#### Windows:

```powershell
# PowerShell ausführen als Administrator
.\deploy.ps1
```

Alternativ kannst du die Docker-Befehle manuell ausführen:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Logs überprüfen

```bash
docker-compose logs -f hochzeit-app
```

## Entwicklung

Für die lokale Entwicklung:

```bash
npm install
npm run dev
```

## Build

Um die Anwendung zu bauen:

```bash
npm run build
```

Die Build-Artefakte werden in `/dist` erzeugt.

## Technologie-Stack

- Frontend: React mit TypeScript, Tailwind CSS
- Backend: Express.js mit TypeScript
- Build-Tools: Vite, esbuild
- Deployment: Docker, Traefik
