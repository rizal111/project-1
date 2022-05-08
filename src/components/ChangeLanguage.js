import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Typography,
  List,
  ListItem,
  DialogTitle,
  Dialog,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const ChangeLanguage = () => {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const langs = {
    en: { name: "English" },
    may: { name: "Malay" },
  };

  const handleClose = () => {};

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    console.log(i18n.language);
    setCurrentLang(i18n.language);
  }, []);

  return (
    <div>
      <Button
        color="secondary"
        onClick={() => setOpen(true)}
        startIcon={<LanguageIcon />}
      >
        <Typography>{langs[i18n.language].name}</Typography>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set Language</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.keys(langs).map((lang) => (
            <ListItem
              button
              onClick={() => handleLanguageChange(lang)}
              key={lang}
            >
              {langs[lang].name}
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default ChangeLanguage;
