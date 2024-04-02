import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {useEffect, useState} from "react";
import {getProjectData, getProjectFiles, getProjectsById} from "../../../server-api/using";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

function ExpandIcon(props) {
    return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
    return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
    return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

export default function FileTreeView() {
    const [files, setFiles] = useState([]);
    const [projectName, setProjectName] = useState('project')
    const [projectData, setProjectData] = useState([]);
    const [tabs, setTabs] = useState([]);
    useEffect(() => {
        getProjectFiles(function (res) {
            setFiles(res.result)
        });
        getProjectData(function (res) {
            setProjectName(res.project.name)
            setProjectData(res)
        })
        if (!localStorage.getItem('editor-tabs'))
            localStorage.setItem('editor-tabs', [].toString())

        setTabs(localStorage.getItem('editor-tabs'))
    }, [tabs])

    function addItemToTabs(item){
        if (tabs !== null) {
            let new_item = JSON.parse(localStorage.getItem('editor-tabs'))
            item[2] = genId();
            new_item.push(item)
            localStorage.setItem('editor-tabs', JSON.stringify(new_item))
        } else {
            let new_item = []
            item[2] = genId();
            new_item.push(item)
            localStorage.setItem('editor-tabs', JSON.stringify(new_item))
        }
    }

    function genId(){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return `${result}`;
    }

    const FileTree = ({data}) => {
        return (
            <div>
                {data && Object.entries(data).map(item => (
                    typeof item[1] === "object"
                        ? <CustomTreeItem itemId={genId()} label={item[0]}>
                            {item[0] && <FileTree data={item[1]}/>}
                        </CustomTreeItem>
                        : <CustomTreeItem itemId={genId()} label={item[0]} onClick={() => {
                            addItemToTabs(item)
                        }}/>
                ))}
            </div>
        );
    }



    const FileTreeFrame = () => (
        <CustomTreeItem itemId="1" label={projectName}>
            <FileTree data={files}/>
        </CustomTreeItem>
    )

    return (
        <SimpleTreeView
            aria-label="customized"
            defaultExpandedItems={['1', '3']}
            slots={{
                expandIcon: ExpandIcon,
                collapseIcon: CollapseIcon,
                endIcon: EndIcon,
            }}
            sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
        >
            <FileTreeFrame />
        </SimpleTreeView>
    );
}
/**
 * <CustomTreeItem itemId="2" label="File">
 *                     <CustomTreeItem itemId="12" label="File_1" />
 *                     <CustomTreeItem itemId="13" label="File_2" />
 *                     <CustomTreeItem itemId="14" label="File_3" />
 *                 </CustomTreeItem>
 *                 <CustomTreeItem itemId="3" label="Folder">
 *                     <CustomTreeItem itemId="6" label="File" />
 *                     <CustomTreeItem itemId="7" label="Folder">
 *                         <CustomTreeItem itemId="9" label="File_1" />
 *                         <CustomTreeItem itemId="10" label="File_2" />
 *                         <CustomTreeItem itemId="11" label="File_3" />
 *                     </CustomTreeItem>
 *                     <CustomTreeItem itemId="8" label="File" />
 *                 </CustomTreeItem>
 *                 <CustomTreeItem itemId="4" label="File" />
 *                 <CustomTreeItem itemId="5" label="File" />
 * */